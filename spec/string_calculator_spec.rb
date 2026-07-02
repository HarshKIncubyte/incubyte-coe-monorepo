# frozen_string_literal: true

require 'spec_helper'
require_relative '../lib/string_calculator'

RSpec.describe StringCalculator do
  describe '.add' do
    context 'when the input is an empty string' do
      it 'returns 0' do
        expect(described_class.add('')).to eq(0)
      end
    end

    context 'when the input is a single number' do
      it 'returns the number itself' do
        expect(described_class.add('1')).to eq(1)
      end
    end

    context 'when the input has two numbers' do
      it 'returns the sum of two numbers' do
        expect(described_class.add('1,2')).to eq(3)
      end
    end

    context 'when the input has a newline as delimiter' do
      it 'returns the sum of numbers separated by newlines' do
        expect(described_class.add("1\n2,3")).to eq(6)
      end
    end

    context 'when the input has a custom delimiter' do
      it 'returns the sum of numbers with custom delimiter' do
        expect(described_class.add("//;\n1;2")).to eq(3)
      end
    end

    context 'when the input has a negative number' do
      it 'raises an exception' do
        expect { described_class.add('1,-2,3') }.to raise_error(ArgumentError, 'negative numbers not allowed: -2')
      end
    end

    context 'when the input has numbers greater than 1000' do
      it 'ignores numbers greater than 1000' do
        expect(described_class.add('2,1001')).to eq(2)
      end
    end
  end
end
