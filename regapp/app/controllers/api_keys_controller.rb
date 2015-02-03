class ApiKeysController < ApplicationController
  
  before_action :require_login
  
  def show
    @key = ApiKey.new;
    @current_user.api_key = @key;
  end
  
  def revokekey
    @key = ApiKey.find_by_id(params[:apikey])
  end
  
  def deletekey
    ApiKey.find_by_id(params[:apikeyid]).destroy
  end
  
end
