# == Schema Information
#
# Table name: mileages
#
#  id         :integer          not null, primary key
#  project_id :integer          not null
#  user_id    :integer          not null
#  value      :integer          not null
#  date       :date             not null
#  billed     :boolean          default("false")
#  created_at :datetime
#  updated_at :datetime
#

class Mileage < Entry
  scope :by_last_created_at, -> { order("created_at DESC") }
  scope :by_date, -> { order("date DESC") }
  scope :billable, -> { where("billable").joins(:project) }
  scope :with_clients, -> {
    where.not("projects.client_id" => nil).joins(:project)
  }

  before_validation :allowed_distance

  MAX_ALLOWED_DISTANCE = 100

  def self.query(params, includes = nil)
    EntryQuery.new(self.includes(includes).by_date, params, "mileages").filter
  end

  def allowed_distance
    errors.add(:value, "over allowed distance") if value > MAX_ALLOWED_DISTANCE
  end
end
