//
//  PlaceListView.swift
//  MyFavouritePlaces
//
//  Created by Sri Ram Mannam on 11/9/25.
//

import SwiftUI

struct PlaceListView: View {
    @State private var places = samplePlaces
    @State private var showFavoritesOnly = false
    
    var filteredPlaces: [Place] {
        if showFavoritesOnly {
            return places.filter { isFavorite(place: $0) }
        }
        return places
    }
    
    @State private var favorites: Set<UUID> = []
    
    func isFavorite(place: Place) -> Bool {
        favorites.contains(place.id)
    }
    
    func toggleFavorite(place: Place) {
        if favorites.contains(place.id) {
            favorites.remove(place.id)
        } else {
            favorites.insert(place.id)
        }
    }
    
    var body: some View {
        NavigationStack {
            List {
                Toggle("Show Favorites Only", isOn: $showFavoritesOnly)
                    .padding(.vertical, 8)
                
                ForEach(filteredPlaces) { place in
                    NavigationLink(destination: PlaceDetailView(
                        place: place,
                        isFavorite: isFavorite(place: place),
                        toggleFavorite: { toggleFavorite(place: place) }
                    )) {
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(place.name)
                                    .font(.headline)
                                Text(place.city)
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                            }
                            
                            Spacer()
                            
                            if isFavorite(place: place) {
                                Image(systemName: "star.fill")
                                    .foregroundColor(.yellow)
                            }
                        }
                        .padding(.vertical, 4)
                    }
                }
            }
            .navigationTitle("My Favorite Places")
        }
    }
}

struct PlaceListView_Previews: PreviewProvider {
    static var previews: some View {
        PlaceListView()
    }
}
