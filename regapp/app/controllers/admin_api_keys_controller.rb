class AdminApiKeysController < ApplicationController
  
  before_action :require_adminlogin
  
  def show
    @keys = @current_admin.api_keys
  end
  
  def revokekey
    @key = ApiKey.find_by_id(params[:apikey])
  end
  
  def deletekey
    ApiKey.find_by_id(params[:apikeyid]).destroy
  end

end
