class SessionsController < ApplicationController
  
  def api_auth
    creator = Creator.find_by(email: params[:email].downcase)
    if creator && creator.authenticate(params[:password])
      render :json { :auth_token: encodeJWT(creator) }
    else
      render :json { error: 'Ogiltigt användarnamn eller lösenord' }, status: :unauthorized
    end
  end  
end
