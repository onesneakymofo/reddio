class CreateTables < ActiveRecord::Migration[7.0]
  def change
    create_enum :occurrence_enum, Constants::OCCURRENCES

    create_table :subreddits do |t|
      t.string :name
      t.timestamp
    end

    create_table :listings do |t|
      t.timestamps
      t.references :tank, foreign_key: true
      t.integer :external_id, unique: true, null: false
      t.integer :score, null: false
      t.string :description
      t.added_at :datetime, null: false
    end

    create_table :listing_details do |t|
      t.references :listing, foreign_key: true
      t.text :url
      t.string :video_id, null: false, unique: true
      t.timestamps
    end
  end
end
