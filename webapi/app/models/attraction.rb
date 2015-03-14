class Attraction < ActiveRecord::Base
  
  before_save { self.address = address.downcase }
  
  geocoded_by :address
  after_validation :geocode, :if => :address_changed?
  
  include Rails.application.routes.url_helpers 
  
  belongs_to :user
  has_and_belongs_to_many :tags
  
  validates :address, 
            presence: true,
            uniqueness: { case_sensitive: false }
  
  validates :user_id, presence: true
  
  def serializable_hash (options={} )
    options = {
      only: [:address, :latitude, :longitude, :id],
      include: [:tags],
      methods: [:self_link]
      }.update(options)
    super(options)
  end
  
  def self_link
    { :self => "#{Rails.configuration.baseurl}#{attraction_path(self)}" }
  end

end