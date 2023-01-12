class CreateTables < ActiveRecord::Migration[7.0]
  def change
    create_enum :occurrence_enum, Constants::OCCURRENCES

    create_table :subreddits do |t|
      t.string :name
      t.timestamps
    end

    create_table :listings do |t|
      t.string :reddit_id, unique: true, null: false
      t.integer :score, null: false
      t.string :description
      t.datetime :added_at, null: false
      t.timestamps
    end

    create_table :video_details do |t|
      t.references :listing, foreign_key: true
      t.text :url
      t.string :video_id, null: false, unique: true
      t.text :title, null: false, unique: true
      t.text :owner, null: false, unique: true
      t.text :duration, null: false, unique: true
      t.timestamps
    end
  end
end
