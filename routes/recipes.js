const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const Recipe = require('../models/recipe');
const { validateRecipe } = require('../middleware/validation');
const { isLoggedIn, isAuthor } = require('../middleware/authentication');




router.get(
  '/myrecipes',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const recipes = await Recipe.find({author: req.user._id});
    res.render('recipes/myrecipes', { recipes });
  })
);
// render a list of recipes
router.get(
  '/',
  catchAsync(async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/home', { recipes });
  })
);

router.get(
  '/home',
  catchAsync(async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/home', { recipes });
  })
);


// render a form for a new recipe
router.get('/new', isLoggedIn, (req, res) => {
  res.render('recipes/new');
});

// list a recipe with :id
router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.findById(id).populate('author');
      //console.log(recipe);
      res.render('recipes/show', { recipe });
    } catch (err) {
      req.flash('error', 'Recept nebyl nalezen!');
      return res.redirect('/recipes/myrecipes');
    }
  })
);

// render a form to edit recipe with id
router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      req.flash('error', 'Recept nebyl nalezen!');
      return res.redirect('/recipes/recipes');
    }

    res.render('recipes/edit', { recipe });
  })
);

// data for creating a new recipe are coming -> create a new recipe -> redirect to list all recipes
router.post(
  '/',
  isLoggedIn,
  validateRecipe,
  catchAsync(async (req, res, next) => {
    const recipe = new Recipe(req.body.recipe);
    recipe.author = req.user._id;
    await recipe.save();
    req.flash('success', 'Váš recept byl úspěšně přidán!');
    res.redirect('/recipes/myrecipes');
  })
);

// data for updating recipe with :id is comming -> find and update recipe -> redirect to list of all recipes
router.patch(
  '/:id',
  isLoggedIn,
  isAuthor,
  validateRecipe,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, {
      ...req.body.recipe,
    });
    req.flash('success', 'Váš recept byl úspěšně aktualizován!');
    res.redirect(`/recipes/${recipe._id}`);
  })
);

// id for deleting recipe is coming -> find and delete recipe -> redirect to list of all recipes
router.delete(
  '/:id',
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    req.flash('success', 'Váš recept byl úspěšně odstraněn!');
    res.redirect('/recipes/myrecipes');
  })
);


module.exports = router;

