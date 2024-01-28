class HomeController < ApplicationController
  def index
    @main_catergories = Category.take(4) # get 4 random categories
  end
end