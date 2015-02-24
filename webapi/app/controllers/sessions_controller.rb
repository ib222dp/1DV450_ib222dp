class SessionsController < ApplicationController
  
  #Anropas av klient som vill bli autentiserad och få en JSON web token
  def api_auth
    user = User.find_by(email: params[:email].downcase)
    if user && user.authenticate(params[:password])
      render json: { auth_token: encodeJWT(user) }
    else
      render json: { error: 'Ogiltigt användarnamn eller API-nyckel' }, status: :unauthorized
    end
  end
  
end