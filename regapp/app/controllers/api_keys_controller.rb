class ApiKeysController < ApplicationController
  
  before_action :require_login
  
  def show
    @key = @current_user.api_key
  end
  
  def revokekey
    @key = ApiKey.find_by_id(params[:apikey])
    unless @current_user.api_key == @key
      flash[:danger] = "Du har inte åtkomst till denna sida"
      redirect_to userapikey_path
      return 
    end
  end
  
  def deletekey
    @key = ApiKey.find_by_id(params[:apikeyid])
    unless @current_user.api_key == @key
      flash[:danger] = "Du har inte åtkomst till denna sida"
      redirect_to userapikey_path
      return 
    end
   @key.destroy
  end
  
end
