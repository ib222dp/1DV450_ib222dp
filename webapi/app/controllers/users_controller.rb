class UsersController < ApplicationController
  
  #before_action :api_authenticate
  
  #Visar samtliga användare (och de turistattraktioner dessa användare skapat)
  def index
    @users = User.all
    respond_with @users
  end
  
  #Visar en användare (och de turistattraktioner denna användare skapat)
  def show
    @user = User.find(params[:id])
    respond_with @user
    
    rescue ActiveRecord::RecordNotFound
    @error = ErrorMessage.new("Resursen hittades ej", "Användaren hittades ej")
    respond_with  @error, status: :not_found
  end
  
end