class AddMaxHoursToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :max_hours, :integer, default: 24
  end
end
