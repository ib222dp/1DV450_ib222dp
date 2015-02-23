class UsersController < ApplicationController
  
  #before_action :api_authenticate, only: [:index, :show]
  
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format
  
  #Visar samtliga användare
  def index
    @users = User.all
    respond_with @users
  end
  
  #Visar en användare och de turistattraktioner denna användare skapat
  def show
    @user = User.find(params[:id])
    respond_with @user
    
    rescue ActiveRecord::RecordNotFound
    @error = ErrorMessage.new("Resursen hittades ej", "Användaren hittades ej")
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