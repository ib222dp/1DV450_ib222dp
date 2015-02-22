class SessionsController < ApplicationController
  protect_from_forgery :except => [:api_auth]
  
  def new
    
  end
  
  def create
    user = User.find_by(email: params[:session][:email].downcase)
    
    if user && user.authenticate(params[:session][:password])
      login user
      redirect_to new_attraction_path
    else
      flash.now[:danger] = "Ogiltigt användarnamn eller lösenord"
      render 'new'
    end
  end
  
  def destroy
    logout
    flash[:info] = "Du har loggat ut"
    redirect_to root_url
  end
  
  #Anropas av klient som vill bli autentiserad och få en JSON web token
  def api_auth
    user = User.find_by(email: params[:email].downcase)
    if user && user.apikey == params[:apikey]
      render json: { auth_token: encodeJWT(user) }
    else
      render json: { error: 'Ogiltigt användarnamn eller API-nyckel' }, status: :unauthorized
    end
  end
  
end
