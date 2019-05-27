package com.recipeApp.controller.services;

import java.sql.*;
import java.util.ArrayList;

import com.recipeApp.controller.dto.RecipeDTO;
import org.apache.log4j.Logger;

public class RecipeService {

	private Connection conn = null;
	private final Logger logger = Logger.getLogger(this.getClass());

	public RecipeService() {
		try {

			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	        conn = DriverManager.getConnection("jdbc:sqlserver://NOIDW10SX5971\\SQLEXPRESS:1434;databaseName=recipe_db;user=recipeAdmin;password=recipe_password123");

	        logger.info("Connected to DB");
		} catch(Exception E) {
			logger.error("RecipeService: Unable to connect to DB: " + E.toString());
		}
	}
	
	public RecipeDTO getSingleRecipe (int id) {
		RecipeDTO recipe = new RecipeDTO();
		
		try {
			logger.info("RecipeService.getSingleRecipe: In get single recipe");

			String query = String.format("Select * from recipes where id=%d", id);

	    	PreparedStatement ps = conn.prepareStatement(query);
	        ResultSet rs = ps.executeQuery();

			logger.info("RecipeService.getSingleRecipe: getSingleRecipe-successful");

	        while (rs.next()) {
				recipe = createRecipeObjectFromResultSet(rs);
	        }
	        conn.close();
        } catch (Exception e){
        	logger.error("RecipeService.getSingleRecipe: " + e.toString());
        }
		
		return recipe;
	}
	
	public ArrayList<RecipeDTO> getAllRecipes() {
		ArrayList<RecipeDTO> recipeList = new ArrayList<RecipeDTO>();
		
		try {
			logger.info("RecipeService.getAllRecipes: in getAllRecipe");

			String query = "Select * from recipes";

	    	PreparedStatement ps = conn.prepareStatement(query);
	        ResultSet rs = ps.executeQuery();

			logger.info("RecipeService.getAllRecipes: getAllRecipe-successful");
	        while (rs.next()) {
		        RecipeDTO recipe = createRecipeObjectFromResultSet(rs);
		        recipeList.add(recipe);
	        }
	        conn.close();
        } catch (Exception e){
        	logger.error("RecipeService.getAllRecipes: " + e.toString());
        }
		
		return recipeList;
	}

	public Boolean createRecipe(RecipeDTO recipe) {
		Boolean flag = true;
		try {
			logger.info("RecipeService.createRecipe: in createRecipe");

			PreparedStatement ps = conn.prepareStatement("Select COUNT(*) from recipes");
			ResultSet rs = ps.executeQuery();
			rs.next();
			String id = rs.getString("");
			String query = String.format("INSERT INTO recipes (id, image_url, title, description, vegetarian, favourite) VALUES " +
					"(%s, \'%s\', \'%s\', \'%s\', %s, %s)",
					id, recipe.getImage_url(), recipe.getTitle(), recipe.getDescription(), getStringFromBoolean(recipe.getVegetarian()), getStringFromBoolean(recipe.getFavourite()));

			ps = conn.prepareStatement(query);
			ps.execute();

			logger.info("RecipeService.createRecipe: createRecipe-successful");

			conn.close();
		} catch (Exception e){
			flag = false;
			logger.error(e.toString());
		}

		return flag;
	}

	public Boolean editRecipe(RecipeDTO recipe, int id) {
		Boolean flag = true;
		try {
			logger.info("RecipeService.editRecipe: in editRecipe");

			String query = String.format("UPDATE recipes SET image_url=\'%s\',title=\'%s\',description=\'%s\',vegetarian=\'%s\',favourite=\'%s\' WHERE id=%d"
					, recipe.getImage_url(), recipe.getTitle(), recipe.getDescription(), (recipe.getVegetarian()?"1":"0"), (recipe.getFavourite()?"1":"0"), recipe.getId());

			String completeQuery = query.concat(query);

			PreparedStatement ps = conn.prepareStatement(completeQuery);
			ps.execute();
			conn.close();

			logger.info("RecipeService.editRecipe: editRecipe-successful");
		} catch (Exception e){
			flag = false;
			logger.error("RecipeService.editRecipe: " +e.toString());
		}

		return flag;
	}

	public Boolean setFavourite(int id) {
		Boolean flag;
		try {
			logger.info("RecipeService.setFavourite: in favourite for id = " + id);

			String query = String.format("UPDATE recipes SET favourite = favourite^1 WHERE id=%d", id);
			PreparedStatement ps = conn.prepareStatement(query);
			ps.execute();
			flag = true;
			conn.close();

			logger.info("RecipeService.setFavourite: favourite-successful");
		} catch (Exception e){
			flag = false;
			logger.error("RecipeService.setFavourite: " + e.toString());
		}

		return flag;
	}

	public Boolean deleteRecipe(int id) {
		Boolean flag;
		try {
			logger.info("RecipeService.deleteRecipe: in delete for id = " + id);

			String query = String.format("DELETE FROM recipes WHERE id=%d", id);
			PreparedStatement ps = conn.prepareStatement(query);
			ps.execute();
			flag = true;
			conn.close();

			logger.info("RecipeService.deleteRecipe: delete-successful");
		} catch (Exception e){
			flag = false;
			logger.error("RecipeService.deleteRecipe: " + e.toString());
		}

		return flag;

	}

	public Boolean getBooleanFromString(String string) {
		if(string.equals("1")) {
			return true;
		}
		return false;
	}

	private String getStringFromBoolean(Boolean value) {
		if(value != null && value) {
			return "1";
		}
		return "0";
	}

	private RecipeDTO createRecipeObjectFromResultSet(ResultSet rs) throws SQLException{

		RecipeDTO recipe = new RecipeDTO();
		recipe.setId(Integer.parseInt(rs.getString("id")));
		recipe.setTitle(rs.getString("title"));
		recipe.setDescription(rs.getString("description"));
		recipe.setImage_url(rs.getString("image_url"));
		recipe.setFavourite(getBooleanFromString(rs.getString("favourite")));
		recipe.setVegetarian(getBooleanFromString(rs.getString("vegetarian")));

		return recipe;
	}

}
