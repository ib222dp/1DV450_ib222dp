class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  
  include SessionsHelper
  
  respond_to :json
  
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format
  
  protected
  
  def raise_bad_format
    @error = ErrorMessage.new("API:et stöder inte det begärda formatet", "API:et stöder inte det begärda formatet")
    render json: @error, status: :bad_request
  end

end

 class ErrorMessage
  
  def initialize(dev_mess, usr_mess)
    @developerMessage = dev_mess
    @userMessage = usr_mess
  end

end

#before_action :set_no_cache
  
 
  
   #def set_no_cache
    #response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    #response.headers["Pragma"] = "no-cache"
    #response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  #end