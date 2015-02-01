class ApiKeysController < ApplicationController
  before_action :require_login
  def show
    @key = @current_user.api_key
  end
end
