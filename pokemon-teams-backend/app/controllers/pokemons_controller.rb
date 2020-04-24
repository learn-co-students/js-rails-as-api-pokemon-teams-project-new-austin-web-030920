class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find(params[:trainer_id]);
        pokemon = Pokemon.create({
          nickname: Faker::Name.first_name,
          species: Faker::Games::Pokemon.name,
          trainer: trainer
        })

        render json: pokemon, except: [:created_at, :updated_at]
    end

    def destroy
        pokemon = Pokemon.find(params[:id]);
        pokemon.delete
        render json: pokemon, except: [:created_at, :updated_at]
    end

    private

        # def pokemon_params
        #     params.require(':pokemon').include()
        # end
end
