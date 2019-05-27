package com.recipeApp.controller;

import com.recipeApp.controller.dto.RecipeDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.recipeApp.controller.services.RecipeService;

import java.util.List;

@RestController
@RequestMapping(value = {"/", "/recipe"})
public class RecipeController{

    @RequestMapping(method = RequestMethod.GET, value="/get-single-recipe/{id}")
    public ResponseEntity<RecipeDTO> getSingleRecipe(@PathVariable(value="id") int id) {
        RecipeDTO recipe = new RecipeService().getSingleRecipe(id);
        return new ResponseEntity<RecipeDTO>(recipe, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value="/get-all-recipe", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RecipeDTO>> getAllRecipes() {
        List<RecipeDTO> response = new RecipeService().getAllRecipes();
        return new ResponseEntity<List<RecipeDTO>>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value="/create-recipe")
    public Boolean createRecipe(@RequestBody RecipeDTO recipe) {
        Boolean flag = new RecipeService().createRecipe(recipe);
        return flag;
    }

    @RequestMapping(method = RequestMethod.PUT, value="/edit-recipe/{id}")
    public Boolean editRecipe(@RequestBody RecipeDTO recipe,
                              @PathVariable(value = "id") int id) {
        Boolean flag = new RecipeService().editRecipe(recipe, id);
        return flag;
    }

    @RequestMapping(method = RequestMethod.PUT, value="/favourite/{id}")
    public ResponseEntity<Boolean> setAsFavourite(@PathVariable(value = "id") int id) {
        Boolean flag = new RecipeService().setFavourite(id);
        return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/delete-recipe/{id}")
    public Boolean deleteRecipe(@PathVariable(value = "id") int id) {
        Boolean flag = new RecipeService().deleteRecipe(id);
        return flag;
    }
}
