class AdminsController < ApplicationController
  
  def index
    
  end
  
  ## In- och utloggning
  
  def adminlogin
    a = Admin.find_by_username(params[:username])
    if a && a.authenticate(params[:password])
      session[:adminid] = a.id
      redirect_to adminapikey_path
    else
      flash[:notice] = "Inloggning misslyckades"
      redirect_to admin_path
    end
  end
  
  def adminlogout
    session[:adminid] = nil
    redirect_to admin_path, :notice => "Du har loggat ut"
  end
  
end
