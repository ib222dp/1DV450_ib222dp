class UsersController < ApplicationController
  
  def index
  
  end
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params) 
    
    if @user.save
      session[:userid] = @user.id
      redirect_to userapikey_path
    else
      render :action => "new"
    end
  end
  
   ## In- och utloggning
  
  def login
    u = User.find_by(email: params[:email].downcase)
    if u && u.authenticate(params[:password])
      session[:userid] = u.id
      redirect_to userapikey_path
    else
      flash[:danger] = "Inloggning misslyckades"
      redirect_to root_path
    end
  end
  
  def logout
    session[:userid] = nil
    flash[:info] = "Du har loggat ut"
    redirect_to root_path 
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :app_url)
  end
  
end
