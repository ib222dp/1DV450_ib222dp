class AttractionsController < ApplicationController
  
  respond_to :json
  
  #before_action :api_authenticate, only: [:index, :show]
  before_action :check_user, only: [:new, :create]
  before_action :set_no_cache, only: [:new, :create]
  
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format
  
  #Visar samtliga turistattraktioner skapade av en viss användare,
  #eller samtliga turistattraktioner som inte ligger längre än 80 km ifrån en viss plats(URL .../attractions?latitude=värde&longitude=värde)
  #eller samtliga turistattraktioner sorterade enligt senaste datum
  def index
    if params[:user_id].present?
      @user = User.find(params[:user_id])
      @attractions = @user.attractions
    elsif request.query_string.present?
      @attractions = Attraction.near([params[:latitude], params[:longitude]], 80, :units => :km)
    else
      @attractions = Attraction.all.order("created_at DESC")
    end
    respond_with @attractions
  end
  
  #Visar en enskild turistattraktion
  def show
    @attraction = Attraction.from_param(params[:id])
    respond_with @attraction
    
  rescue ActiveRecord::RecordNotFound
    @error = ErrorMessage.new("Resursen hittades ej")
    respond_with @error, status: :not_found
  end
  
  #Skapar ny turistattraktion
  def new
    @attraction = Attraction.new
  end
  
  def create
    #@user = User.find(session[:user_id])
    @attraction = Attraction.new(attraction_params)
    
    if @attraction.save
      flash.now[:info] = "Turistattraktionen har sparats"
      render 'new'
    else
      render 'new'
    end
  end
  
  private
  
  def attraction_params
    params.require(:attraction).permit(:address, :latitude, :longitude) 
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