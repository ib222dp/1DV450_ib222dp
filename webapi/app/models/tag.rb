class Tag < ActiveRecord::Base
  
  before_save { self.name = name.downcase }
  
  include Rails.application.routes.url_helpers 
  
  has_and_belongs_to_many :attractions
  
  validates :name,
            presence: true,
            uniqueness: { case_sensitive: false }
  
  def serializable_hash (options={})
    options = {
      only: [:name, :id],
      methods: [:self_link]
    }.update(options)
    super(options)
  end
  
  def self_link
    { :self => "#{Rails.configuration.baseurl}#{tag_path(self)}" }
  end

end
