class AdminsController < ApplicationController
  
  def index
    
  end
  
  ## In- och utloggning
  
  def adminlogin
    a = Admin.find_by_username(params[:username])
    if a && a.authenticate(params[:password])
      session[:adminid] = a.id
      redirect_to adminapikeys_path
    else
      flash[:danger] = "Inloggning misslyckades"
      redirect_to admin_path
    end
  end
  
  def adminlogout
    session.delete(:adminid)
    @current_admin = nil
    flash[:info] = "Du har loggat ut"
    redirect_to admin_path 
  end
  
end
