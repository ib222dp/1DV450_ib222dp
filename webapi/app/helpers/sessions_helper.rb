module SessionsHelper
  
  def login(user)
    session[:user_id] = user.id
  end
  
  def logout(user)
    session.delete(:user_id)
    @current_user = nil
  end
  
  def current_user
    @current_user || User.find_by(id: session[:user_id]) 
  end
  
  def is_logged_in?
    !current_user.nil?
  end
  
  def check_user
    unless is_logged_in?
      flash[:danger] = "Du är inte inloggad"
      redirect_to login_path
    end
  end
  
  #API-autentisering
  
  def api_authenticate
    if request.headers["Authorization"].present?
      auth_header = request.headers["Authorization"].split(' ').last
      @token_payload = decodeJWT auth_header.strip
      if !@token_payload
        render json: { error: "Angiven token ej korrekt" }, status: :bad_request
      end
    else
      render json: { error: "Authorization-header måste inkluderas" }, status: :forbidden
    end
  end
  
  def encodeJWT(user, exp=2.hours.from_now)
    payload = { user_id: user.id }
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base, "HS512") 
  end
  
  def decodeJWT(token)
    payload = JWT.decode(token, Rails.application.secrets.secret_key_base, "HS512")
    if payload[0]["exp"] >= Time.now.to_i
      payload
    else
      puts "Token är inte längre giltig"
      false
    end
  rescue => error
      puts "Något gick fel"
      nil
  end
end
