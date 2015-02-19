class AdminApiKeysController < ApplicationController
  
  before_action :require_adminlogin
  
  def show
    @keys = @current_admin.api_keys
  end
  
  def revokekey
    @key = ApiKey.find_by_id(params[:apikey])
    unless @current_admin.api_keys.include?(@key)
      flash[:danger] = "Du har inte åtkomst till denna sida"
      redirect_to adminapikeys_path
      return 
    end
  end
  
  def deletekey
    @key = ApiKey.find_by_id(params[:apikeyid])
     unless @current_admin.api_keys.include?(@key)
      flash[:danger] = "Du har inte åtkomst till denna sida"
       redirect_to adminapikeys_path
      return 
    end
    @key.destroy
  end

end
