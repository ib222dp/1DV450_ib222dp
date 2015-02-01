class AdminApiKeysController < ApplicationController
  
  before_action :require_adminlogin
  def show
    @keys = @current_admin.api_keys
  end
  
  def revoke
    @key = ApiKey.find(params[:apikey])
  end
  
  def revokekey
    
  end

end
