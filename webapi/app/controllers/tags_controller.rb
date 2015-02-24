class TagsController < ApplicationController
  
  #before_action :check_apikey
  before_action :offset_params, only: [:index]
  
  #Visar samtliga taggar (och alla turistattraktioner tillhörande dessa taggar)
  def index
    @tags = Tag.limit(@limit).offset(@offset).all
    respond_with @tags
  end
  
  #Visar en tagg (och alla turistattraktioner tillhörande denna tagg)
  def show
    @tag = Tag.find(params[:id])
    respond_with @tag
  end

end