class UsersController < ApplicationController
  
  before_action :offset_params, only: [:index]
  
  #Visar samtliga användare (och de turistattraktioner dessa användare skapat)
  def index
    @users = User.limit(@limit).offset(@offset).all
    respond_with @users
  end
  
  #Visar en användare (och de turistattraktioner denna användare skapat)
  def show
    @user = User.find(params[:id])
    respond_with @user
  end
  
end