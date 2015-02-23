class TagsController < ApplicationController
   
  #before_action :api_authenticate, only: [:index, :show]
  
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format
  
  #Visar samtliga taggar
  def index
    @tags = Tag.all
    respond_with @tags
  end
  
  #Visar en tagg och alla turistattraktioner tillhörande denna tagg
  def show
    @tag = Tag.find(params[:id])
    respond_with @tag
    
    rescue ActiveRecord::RecordNotFound
    @error = ErrorMessage.new("Resursen hittades ej", "Taggen hittades ej")
    respond_with  @error, status: :not_found
    
  end
  
  private
  
  def raise_bad_format
    @error = ErrorMessage.new("API:et stöder inte det begärda formatet", "API:et stöder inte det begärda formatet")
    render json: @error, status: :bad_request
  end

end

class ErrorMessage
  
  def initialize(dev_mess, usr_mess)
    @developerMessage = dev_mess
    @userMessage = usr_mess
  end
end
