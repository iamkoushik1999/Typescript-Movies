import { Request, Response } from 'express';
import movieModel from '../models/movieModel';
import allMovies from '../data/movies.json';

// --------------------------------------------------

interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
  genre?: string;
}

// GET
// MOVIES
export const getMovies = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  try {
    const page = parseInt(req.query.page || '1') - 1;
    const limit = parseInt(req.query.limit || '5');
    const search = req.query.search || '';
    let genre: string | string[] = req.query.genre || 'All';

    const genreOptions: string[] = [
      'Action',
      'Romance',
      'Fantasy',
      'Drama',
      'Crime',
      'Adventure',
      'Thriller',
      'Sci-fi',
      'Music',
      'Family',
    ];

    genre = genre === 'All' ? genreOptions : genre.split(',');

    const movies = await movieModel
      .find({ name: { $regex: search, $options: 'i' } })
      .where('genre')
      .in(genre as string[])
      .skip(page * limit)
      .limit(limit);

    const total = await movieModel.countDocuments({
      genre: { $in: genre as string[] },
      name: { $regex: search, $options: 'i' },
    });

    const response = {
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// POST
// MOVIES
export const postMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieModel.insertMany(allMovies);
    res.status(201).json({ message: 'Movies added', movies });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// GET
// SEARCH
export const search = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res.status(400).json({ error: 'Please select search' });
    }

    // case-insensitive {search}
    const regex = new RegExp(search, 'i');

    // Search Result
    const suggetions = await movieModel.find(
      {
        $or: [{ name: regex }, { genre: regex }],
      },
      {
        name: 1,
        _id: 0,
      }
    );

    const data = suggetions.map((ele) => ele.name);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
