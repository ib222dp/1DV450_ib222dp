class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
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
