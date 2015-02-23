class SessionsController < ApplicationController
  protect_from_forgery :except => [:api_auth]
  
  def create
    user = User.find_by(email: params[:email].downcase)
    if user && user.authenticate(params[:password])
      login user
      respond_with user, status: :ok
    else
      render json: { error: 'Ogiltigt användarnamn eller lösenord' }, status: :unauthorized
    end
  end
  
  def destroy
    user = User.find_by(session[:user_id])
    logout user
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
