class Attraction < ActiveRecord::Base
  
  geocoded_by :address
  after_validation :geocode, :if => :address_changed?
  
  include Rails.application.routes.url_helpers 
  
  belongs_to :user
  has_and_belongs_to_many :tags
  
  validates :address, presence: true
  #validates :user_id, presence: true
  
  def serializable_hash (options={} )
    options = {
      only: [:address, :latitude, :longitude],
      methods: [:self_link]
      }.update(options)
    super(options)
  end
  
  def self_link
    { :self => "#{Rails.configuration.baseurl}#{attraction_path(self)}" }
  end

  def to_param
    "#{self.id+1234}"
  end

  def self.from_param(param)
    find_by_id!(param.to_i-1234)
  end

end