class CategoriesController < ApplicationController
  def show
    @category = Category.find(params[:id])
    @products = @category.products
    if params[:max].present? 
      @products = @products.where("price <= ?", params[:max].to_i * 100)
    end
    if params[:min].present?
      @products = @products.where("price >= ?", params[:min].to_i * 100)
    end
  end
end