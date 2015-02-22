class AttractionsController < ApplicationController
  
  respond_to :json
  
  #before_action :api_authenticate, only: [:index, :show]
  before_action :check_user, only: [:new, :create]
  before_action :set_no_cache, only: [:new, :create]
  
  rescue_from ActionController::UnknownFormat, with: :raise_bad_format
  
  #Visar samtliga turistattraktioner sorterade enligt senaste datum, eller samtliga turistattraktioner skapade av en viss användare
  def index
    if params[:user_id].present?
      @user = User.find(params[:user_id])
      @attractions = @user.attractions
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
    @user = User.find(session[:user_id])
    @attraction = Attraction.new(attraction_params)
    
    if @attraction.save
      redirect_to user_attractions_path(@attraction.user_id)
    else
      render 'new'
    end
  end
  
  private
  
  def attraction_params
    params.require(:attraction).permit(:name, :position_id, :user_id, { :value => @user.id} ) 
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