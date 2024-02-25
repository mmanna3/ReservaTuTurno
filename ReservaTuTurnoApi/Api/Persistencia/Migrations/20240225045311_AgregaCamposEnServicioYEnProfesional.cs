using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class AgregaCamposEnServicioYEnProfesional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Precio",
                table: "Servicios",
                newName: "PrecioPorDefecto");

            migrationBuilder.AddColumn<int>(
                name: "DuracionDelTurnoPorDefectoEnMinutos",
                table: "Servicios",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Profesionales",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Telefono",
                table: "Profesionales",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DuracionDelTurnoPorDefectoEnMinutos",
                table: "Servicios");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Profesionales");

            migrationBuilder.DropColumn(
                name: "Telefono",
                table: "Profesionales");

            migrationBuilder.RenameColumn(
                name: "PrecioPorDefecto",
                table: "Servicios",
                newName: "Precio");
        }
    }
}
