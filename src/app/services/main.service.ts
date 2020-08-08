import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Architect } from '../logic/architect/architect';
import { Ground } from '../logic/modeling/ground';
import { Stair } from '../logic/modeling/stair';
import { Room } from '../logic/modeling/room';
import { Bedroom } from '../logic/modeling/bedroom';
import { Bathroom } from '../logic/modeling/bathroom';
import { DrawingService } from './drawing.service';
import { JuniorArchitect } from '../logic/architect/junior-architect';
import { Senior1Architect } from '../logic/architect/senior1-architect';
import { Senior2Architect } from '../logic/architect/senior2-architect';

type Distrito = {
  distrito: string
}

type Canton = {
  canton: string,
  distritos: Distrito[]
}

type Directions = {
  provinciacod: string,
  provincia: string,
  cantones: Canton[]
}


@Injectable({
  providedIn: 'root'
})
export class MainService {
  directions: Directions[] = [];
  architects: Architect[] = [];
  designs: Ground[] = [];
  
  constructor(private service: ServerService, private drawingService: DrawingService) {
      this.loadDirections();
      this.loadArquitects();
      this.loadDesigns();
  }

  loadDirections() {
    this.service.getDirections().subscribe((data: any) => {
      this.directions = data[0].getDirecciones;
    });
  }

  createArchitect(element: any): Architect{
    if (element.level == Architect.levels[Architect.JUNIOR]) {
        return new JuniorArchitect(
          element.firstname,
          element.lastname,
          element.lastname2,
          element.experienceyears);
    } else if (element.level == Architect.levels[Architect.SENIOR1]) {
      return new Senior1Architect(
          element.firstname,
          element.lastname,
          element.lastname2,
          element.experienceyears);
    } else {
      return new Senior2Architect(
          element.firstname,
          element.lastname,
          element.lastname2,
          element.experienceyears);
    }
  }
  loadArquitects() {
    this.service.loadArchitects().subscribe((data: Architect[]) => {
      data.forEach(element => {
        this.architects.push(this.createArchitect(element));
    });
    });
  }

  loadDesigns() {
    this.service.loadDesigns().subscribe((data: any) => {
      data.forEach(element => {
        var ground = new Ground(
          element.size);
        ground._id = element._id;
        ground.getHouse().hasSecondFloor = element.house.hasSecondFloor;
        ground.getHouse().hasHotWater = element.house.hasHotWater;
        ground.getHouse().getFirstFloor().setWidth(element.house.firstFloor.width);
        ground.getHouse().getFirstFloor().setHeight(element.house.firstFloor.height);
        ground.getHouse().getFirstFloor().x = element.house.firstFloor.x;
        ground.getHouse().getFirstFloor().y = element.house.firstFloor.y;
        ground.getHouse().getSecondFloor().setWidth(element.house.secondFloor.width);
        ground.getHouse().getSecondFloor().setHeight(element.house.secondFloor.height);
        ground.getHouse().getSecondFloor().x = element.house.secondFloor.x;
        ground.getHouse().getSecondFloor().y = element.house.secondFloor.y;
        ground.getHouse().stair = new Stair(element.house.stair.kind);
        ground.getHouse().stair.x = element.house.stair.x;
        ground.getHouse().stair.y = element.house.stair.y;
        ground.getHouse().stair.angle = element.house.stair.angle;
        ground.getHouse().stair.setBaseFloor(ground.getHouse().getFirstFloor());
        element.house.rooms.forEach(room => {
          var nRoom: Room;
          switch(room.kind) {
            case Room.BEDROOM:
            case Room.MAIN_BEDROOM:
              nRoom = new Bedroom(room.width, room.height);
              (nRoom as Bedroom).isMainBedroom = room.isMainBedroom;
              (nRoom as Bedroom).hasBalcony = room.hasBalcony;
              (nRoom as Bedroom).hasBathroom = room.hasBathroom;
              (nRoom as Bedroom).hasCloset = room.hasCloset;
              if (room.hasCloset) {
                (nRoom as Bedroom).closet.angle = room.closet.angle;
                (nRoom as Bedroom).closet.x = room.closet.x;
                (nRoom as Bedroom).closet.y = room.closet.y;
                (nRoom as Bedroom).setBaseFloor((nRoom as Bedroom));
              }
              if (room.hasBalcony) {
                (nRoom as Bedroom).balcony.setWidth(room.balcony.width);
                (nRoom as Bedroom).balcony.setHeight(room.balcony.height);
                (nRoom as Bedroom).balcony.x = room.balcony.x;
                (nRoom as Bedroom).balcony.y = room.balcony.y;
                (nRoom as Bedroom).balcony.setBaseFloor((nRoom as Bedroom));
              }
              if (room.hasBathroom) {
                (nRoom as Bedroom).bathroom.x = room.bathroom.x;
                (nRoom as Bedroom).bathroom.y = room.bathroom.y;
                (nRoom as Bedroom).bathroom.changeAngle(room.bathroom.angle);
                (nRoom as Bedroom).bathroom.changeAngle(room.bathroom.angle);
                (nRoom as Bedroom).bathroom.setBaseFloor((nRoom as Bedroom));
              }
              break;
            case Room.COMPLETE_BATHROOM:
            case Room.SIMPLE_BATHROOM:
              nRoom = new Bathroom(0);
              (nRoom as Bathroom).changeAngle(room.angle);
              break;
            default:
              nRoom = new Room(room.width, room.height, room.kind);
          }
          nRoom.kind = room.kind;
          nRoom.floorNumber = room.floorNumber;
          nRoom.x = room.x;
          nRoom.y = room.y;
          ground.getHouse().rooms.push(nRoom);
        });
        ground.setArchitect(this.createArchitect(element.architect));
        this.designs.push(ground);
      });
    });
    
    this.designs.push(this.drawingService.editingGround);
  }
}
