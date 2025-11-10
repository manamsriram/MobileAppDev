//
//  PlaceDetailView.swift
//  MyFavouritePlaces
//
//  Created by Sri Ram Mannam on 11/9/25.
//

import SwiftUI

struct PlaceDetailView: View {
    let place: Place
    @State var isFavorite: Bool
    let toggleFavorite: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Place Image
                Image(place.imageName)
                    .resizable()
                    .scaledToFit()
                    .frame(maxWidth: .infinity)
                    .frame(height: 250)
                    .clipped()
                    .cornerRadius(12)
                
                // Place Name
                Text(place.name)
                    .font(.largeTitle)
                    .fontWeight(.bold)
                
                // City
                HStack {
                    Image(systemName: "mappin.and.ellipse")
                        .foregroundColor(.red)
                    Text(place.city)
                        .font(.title3)
                        .foregroundColor(.gray)
                }
                
                Divider()
                
                // Description
                Text("About")
                    .font(.headline)
                
                Text(place.description)
                    .font(.body)
                    .lineSpacing(5)
                    .fixedSize(horizontal: false, vertical: true)
                
                // Favorite Button
                Button(action: {
                    isFavorite.toggle()
                    toggleFavorite()
                }) {
                    HStack {
                        Image(systemName: isFavorite ? "star.fill" : "star")
                        Text(isFavorite ? "Remove from Favorites" : "Add to Favorites")
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(isFavorite ? Color.yellow : Color.blue)
                    .foregroundColor(isFavorite ? .black : .white)
                    .cornerRadius(10)
                }
                .padding(.top, 20)
                
                Spacer()
            }
            .padding()
        }
        .navigationTitle("Place Details")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct PlaceDetailView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            PlaceDetailView(
                place: samplePlaces[0],
                isFavorite: false,
                toggleFavorite: {}
            )
        }
    }
}
