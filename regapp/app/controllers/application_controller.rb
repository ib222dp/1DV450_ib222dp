class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_no_cache
  
  #Förhindrar i kombination med "data: {no_turbolink: true}" i Logga ut-länkarna
  #att användaren kan komma tillbaka till en inloggad sida efter utloggning genom att trycka på Tillbaka-knappen
  def set_no_cache
    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end
  
  private
  
  def current_user
    @current_user ||= User.find(session[:userid]) if session[:userid]
  end
  
  def current_admin
    @current_admin ||= Admin.find(session[:adminid]) if session[:adminid]
  end
  
  def require_login
    if current_user.nil? then
    redirect_to root_path
    end
  end
    
  def require_adminlogin
    if current_admin.nil? then
    redirect_to admin_path
    end
  end

end
