const Recipe = require('../models/recipe');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Pro zobrazení této stránky se musíte nejdříve příhlásit!');
    return res.redirect('/login');
  } else {
    //req.flash('success', 'User logged in');
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!req.user._id.equals(recipe.author)) {
    req.flash('error', 'Pro úpravu tohoto receptu nemáte dostatečná oprávnění!');
    return res.redirect(`/recipes/${id}`);
  }
  next();
};


