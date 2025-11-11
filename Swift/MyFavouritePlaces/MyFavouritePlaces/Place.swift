//
//  Place.swift
//  MyFavouritePlaces
//
//  Created by Sri Ram Mannam on 11/9/25.
//

import Foundation

struct Place: Identifiable {
    let id = UUID()
    let name: String
    let city: String
    let description: String
    let imageName: String
}
