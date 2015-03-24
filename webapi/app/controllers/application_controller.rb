class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  
  include SessionsHelper
  
  before_action :check_apikey
  
  respond_to :json
  
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  
  #Default-värden för offset och limit
  OFFSET = 0
  LIMIT = 20
  
  protected
  
  #Sätter offset och limit till de värden som skickats med,
  def offset_params
    if params[:offset].present?
      @offset = params[:offset].to_i
    end
    if params[:limit].present?
      @limit = params[:limit].to_i
    end
    #annars till default-värden om inga värden skickats med
    @offset ||= OFFSET
    @limit  ||= LIMIT
  end
  
  #Kontrollerar om anrop har gjorts med en giltig API-nyckel 
  #(http://blog.joshsoftware.com/2014/05/08/implementing-rails-apis-like-a-professional)
  def check_apikey
    apikey = request.headers['X-ApiKey']
    @apiuser = ApiUser.where(apikey: apikey).first if apikey
    unless @apiuser
      self.headers['WWW-Authenticate'] = 'Token realm = "Attractions"'
      render json: { error: "API-nyckel måste inkluderas" }, status: :forbidden
      return false
    end
  end
  
  #Felhantering
  
  def raise_bad_format
    @error = ErrorMessage.new("API:et stöder inte det begärda formatet", "API:et stöder inte det begärda formatet")
    respond_with @error, status: :bad_request
  end
  
  def record_not_found
     @error = ErrorMessage.new("Resursen hittades ej", "Turistattraktionen hittades ej")
    respond_with @error, status: :not_found
  end

end

 class ErrorMessage
  
  def initialize(dev_mess, usr_mess)
    @developerMessage = dev_mess
    @userMessage = usr_mess
  end

end