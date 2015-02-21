class AttractionsController < ApplicationController
  
  before_action :check_user, only: [:new, :create]
  before_action :set_no_cache, only: [:new, :create]
  respond_to :json
  
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format
  before_action :api_authenticate, only: [:index]
  
  #Visar samtliga turistattraktioner sorterade enligt senaste datum
  def index
    @attractions = Attraction.all(:order => "created_at DESC")
    respond_with @attractions
  end
  
  #Skapar ny turistattraktion
  def new
    @attraction = Attraction.new
  end
  
  def create
    @attraction = Attraction.new(attraction_params)
    
    if @attraction.save
      redirect_to attractions_path
    else
      render 'new'
    end
  end
  
  #Visar en enskild turistattraktion
  def show
    @attraction = Attraction.find(params[:id])
    respond_with @attraction
    
  rescue ActiveRecord::RecordNotFound
    @error = ErrorMessage.new("Resursen hittades ej")
    respond_with @error, status: :not_found
  end
  
  private
  
  def attraction_params
    params.require(:attraction).permit(:name, :position_id) 
  end
  
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

end