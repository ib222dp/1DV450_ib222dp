module SessionsHelper
  def api_authenticate
    if request.headers["Authorization"].present?
      auth_header = request.headers["Authorization"].split(' ').last
      @token_payload = decodeJWT auth_header
      if !@token_payload
        render :json { error: "Angiven token ej korrekt" }, status: :bad_request
      end
    else
      render :json { error: "Authorization-header måste inkluderas" }, status: :forbidden
    end
  end
  
  def encodeJWT(user, exp=2.hours.from_now)
    payload = { creator_id: creator.id }
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
    rescue
      puts "Något gick fel"
      nil
  end
end
