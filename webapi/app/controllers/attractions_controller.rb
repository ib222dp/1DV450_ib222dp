class AttractionsController < ApplicationController
  respond_to :json
  
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format
  before_action :api_authenticate, only: [:index]
  
  def index
    @attractions = Attraction.all
    respond_with @attractions
  end
  
  def new
  end
  
  def show
    @attraction = Attraction.find(params[:id])
    respond_with @attraction
    
  rescue ActiveRecord::RecordNotFound
    @error = ErrorMessage.new("Resursen hittades ej")
    respond_with @error, status: :not_found
  end
  
  private
  
  def raise_bad_format
    @error = ErrorMessage.new("API:et stöder inte det begärda formatet")
    render json: @error, status: :bad_request
  end
  
end



class ErrorMessage
  
  def initialize(dev_mess, user_mess)
    @developerMessage = dev_mess
    @userMessage = user_mess
    
  end