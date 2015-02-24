class AttractionsController < ApplicationController
  
  #before_action :api_authenticate, only: [:create, :update, :destroy]
  #before_action :check_apikey, only: [:index, :show]
  before_action :offset_params, only: [:index]
  
  def index
    #Visar samtliga turistattraktioner skapade av en viss användare,
    if params[:user_id].present?
      @user = User.find(params[:user_id])
      @attractions = @user.limit(@limit).offset(@offset).attractions
    #samtliga turistattraktioner tillhörande en viss tagg,
    elsif params[:tag_id].present?
      @tag = Tag.find(params[:tag_id])
      @attractions = @tag.limit(@limit).offset(@offset).attractions
    #samtliga turistattraktioner som inte ligger längre än 80 km ifrån en viss plats (URL .../attractions?latitude=värde&longitude=värde),
    elsif params[:latitude].present? && params[:longitude].present?
      #Metod från gem Geocoder
      @attractions = Attraction.limit(@limit).offset(@offset).near([params[:latitude], params[:longitude]], 80, :units => :km)
    #samtliga turistattraktioner som har ett namn liknande det som skickats med (URL .../attractions?address=värde)
    elsif params[:address].present?
      address_param = params[:address]
      @attractions = Attraction.limit(@limit).offset(@offset).where("address LIKE (?)", "%#{address_param}%")
    #eller samtliga turistattraktioner sorterade enligt senaste datum
    else
      @attractions = Attraction.limit(@limit).offset(@offset).all.order("created_at DESC")
    end
    respond_with @attractions
  end
  
  #Visar en enskild turistattraktion
  def show
    @attraction = Attraction.find(params[:id])
    respond_with @attraction
  end
  
  #Skapar ny turistattraktion
  def create
    attraction = Attraction.new(attraction_params)
    
    if attraction.save
      respond_with attraction, status: :created
    else
      error = ErrorMessage.new("Resursen kunde inte skapas", "Turistattraktionen kunde inte skapas")
      render json: error, status: :bad_request
    end
  end
  
  #Uppdaterar en turistattraktion
  def update
    respond_with Attraction.update(params[:id], attraction_params)
  end
  
  #Raderar en turistattraktion
  def destroy
    respond_with Attraction.destroy(params[:id])#, status: :no_content
  end
  
  private
  
  def attraction_params
    json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_params.require(:attraction).permit(:address, :user_id, :latitude, :longitude)
  end

end