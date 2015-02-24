class TagsController < ApplicationController
  
  #before_action :api_authenticate
  
  #Visar samtliga taggar (och alla turistattraktioner tillhörande dessa taggar)
  def index
    @tags = Tag.all
    respond_with @tags
  end
  
  #Visar en tagg (och alla turistattraktioner tillhörande denna tagg)
  def show
    @tag = Tag.find(params[:id])
    respond_with @tag
    
    rescue ActiveRecord::RecordNotFound
    @error = ErrorMessage.new("Resursen hittades ej", "Taggen hittades ej")
    respond_with  @error, status: :not_found
  end

end