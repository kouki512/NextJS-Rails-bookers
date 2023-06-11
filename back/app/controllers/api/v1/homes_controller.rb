class Api::V1::HomesController < ApplicationController
  def home
    render json: {status: 'SUCCESS', data: 'Welcome to the API!'}
  end
end
