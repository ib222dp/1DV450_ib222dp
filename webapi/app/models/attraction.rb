class Attraction < ActiveRecord::Base
  include Rails.application.routes.url_helpers 
  
  belongs_to :user
  belongs_to :position
  has_and_belongs_to_many :tags
  
  validates :name, presence: true
  
  def serializable_hash (options={} )
    options = {
      only: [:name],
      methods: [:self_link]
      }.update(options)
    super(options)
  end
  
  def self_link
    { :self => "#{Rails.configuration.baseurl}#{attraction_path(self)}" }
  end

end